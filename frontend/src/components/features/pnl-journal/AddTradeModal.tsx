'use client';

import React, {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

interface AddTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {trades: number; pnl: number}) => void;
  date: string;
}

export const AddTradeModal: React.FC<AddTradeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  date
}) => {
  const [trades, setTrades] = useState<number>(1);
  const [pnl, setPnl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      trades,
      pnl: parseFloat(pnl)
    });
    setTrades(1);
    setPnl('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Trades for {date}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trades" className="text-right">
                Number of Trades
              </Label>
              <Input
                id="trades"
                type="text"
                inputMode="numeric"
                pattern="^[0-9]*$"
                value={trades}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setTrades(val ? parseInt(val) : 1);
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pnl" className="text-right">
                P&L ($)
              </Label>
              <Input
                id="pnl"
                type="text"
                inputMode="decimal"
                pattern="^-?\d*(\.\d*)?$"
                value={pnl}
                onChange={e => {
                  let val = e.target.value.replace(/[^0-9.-]/g, '');
                  val = val.replace(/(?!^)-/g, '');
                  const parts = val.split('.');
                  if (parts.length > 2)
                    val = parts[0] + '.' + parts.slice(1).join('');
                  setPnl(val);
                }}
                className="col-span-3"
                placeholder="Enter P&L amount"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
