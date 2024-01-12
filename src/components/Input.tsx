import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, invalid, ...props }: any,
  ref: any
) {
  let classes =
    "w-full p-2 border-b-4 rounded-lg border-stone-300 text-stone-600 focus:outline-none focus:border-stone-600";
  if (invalid) {
    console.log("invalid");
    classes =
      "w-full p-2 border-b-4 rounded-lg border-red-600 text-stone-600 focus:outline-none focus:border-red-400";
  }
  classes += " bg-stone-200 ";
  return (
    <p>
      <label className="block font-bold font-roboto">{label}</label>

      {props.type === "textarea" ? (
        <textarea
          ref={ref}
          placeholder={label}
          className={classes}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          data-theme={props.type == "date" ? "light" : undefined}
          placeholder={label}
          className={classes}
          {...props}
        />
      )}
    </p>
  );
});

export default Input;
