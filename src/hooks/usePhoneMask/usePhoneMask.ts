'use client';

import React from 'react';

const numbersValue = (value: string) => value.replace(/\D/g, '');

const replace = (
  pattern: string,
  value: string,
  from: number,
  to: number,
) => pattern.slice(0, from) + value + pattern.slice(to);


const numbersLengthToSelection: Record<number, number | undefined> = {
  1: 4,
  2: 5,
  3: 6,
  4: 9,
  5: 10,
  6: 11,
  7: 13,
  8: 14,
  9: 16,
  10: 17,
  11: 18,
};

export const usePhoneMask = () => {
  const [value, setValue] = React.useState('');
  const phone = React.useMemo(() => numbersValue(value), [value]);

  const onInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget;
    let numbers = numbersValue(input.value);

    if (!numbers) {
      setValue('');
    }

    numbers = ['7', '8'].includes(numbers[0]) ? `7${numbers.substring(1)}` : `7${numbers}`;
    let formattedInputValue = '+7 (___) ___-__-__';
    if (numbers.length > 1) {
      const firstSegment = numbers.substring(1, 4);
      formattedInputValue = replace(
        formattedInputValue,
        firstSegment,
        4,
        4 + firstSegment.length,
      );
    }
    if (numbers.length >= 5) {
      const secondSegment = numbers.substring(4, 7);
      formattedInputValue = replace(
        formattedInputValue,
        secondSegment,
        9,
        9 + secondSegment.length,
      );
    }
    if (numbers.length >= 8) {
      const thirdSegment = numbers.substring(7, 9);
      formattedInputValue = replace(
        formattedInputValue,
        thirdSegment,
        13,
        13 + thirdSegment.length,
      );
    }
    if (numbers.length >= 10) {
      const fourthSegment = numbers.substring(9, 11);
      formattedInputValue = replace(
        formattedInputValue,
        fourthSegment,
        16,
        16 + fourthSegment.length,
      );
    }


    setValue(formattedInputValue);

    requestAnimationFrame(() => {
      const selection = numbersLengthToSelection[numbers.length];
      if (selection) {
        input.selectionStart = selection;
        input.selectionEnd = selection;
      }
    });
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const numbers = numbersValue(e.currentTarget.value);
    if (e.key === 'Backspace' && numbers.length === 1) {
      setValue('');
    } else if (e.key === 'Backspace') {
      setValue(numbers.substring(0, numbers.length));
    }
  };

  const onPaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget;
    const pasted: DataTransfer = e.clipboardData || (window as any).clipboardData;
    if (!pasted) return;
    const pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      setValue(numbersValue(input.value));
    }
  };

  return {
    value, phone, onInput, onKeyDown, onPaste,
  };
};
