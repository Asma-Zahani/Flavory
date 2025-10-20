import { useState } from "react";

interface IngredientRowProps {
  quantity: number;
  unit: string;
  name: string;
}

export default function IngredientRow({ quantity, unit, name }: IngredientRowProps) {
  const [checked, setChecked] = useState(false);

  return (
    <tr className="border-b border-gray-200 cursor-pointer" onClick={() => setChecked(!checked)}>
      <td className="p-3 w-[30px] text-center border-r border-gray-200 text-grayLight">
        <div className={`w-3.5 h-3.5 flex items-center font-bold justify-center rounded-full border transition-all duration-300 ${
            checked ? "border-none" : ""}`}>
          {checked && "✓"}
        </div>
      </td>

      <td className={`p-3 text-gray transition-all duration-300 ${checked ? "line-through" : ""}`}>
        {quantity} {unit} {name}
      </td>
    </tr>
  );
}