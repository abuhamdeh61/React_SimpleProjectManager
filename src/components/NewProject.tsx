import { useState, useRef } from "react";
import Button from "./Button";
import Input from "./Input";
import { handleValidate } from "../Utils/Validation";
export default function NewProject({ onSubmit, onCancel }: any) {
  const [invalidInputs, setInvalidInputs] = useState({
    Title: false,
    Description: false,
    DeadLine: false,
  });

  const TitleRef = useRef<any>(null);
  const DescriptionRef = useRef<any>(null);
  const DeadLineRef = useRef<any>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      !handleValidate(TitleRef.current.value) ||
      !handleValidate(DescriptionRef.current.value) ||
      !handleValidate(DeadLineRef.current.value)
    ) {
      setInvalidInputs({
        Title: !handleValidate(TitleRef.current.value),
        Description: !handleValidate(DescriptionRef.current.value),
        DeadLine: !handleValidate(DeadLineRef.current.value),
      });
      return;
    }
    onSubmit(
      TitleRef.current.value,
      DescriptionRef.current.value,
      DeadLineRef.current.value
    );
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (handleValidate(e.target.value)) {
      setInvalidInputs({
        ...invalidInputs,
        [e.target.name]: false,
      });
    } else {
      setInvalidInputs({
        ...invalidInputs,
        [e.target.name]: true,
      });
    }
  };
  return (
    <div>
      <div>
        <Input
          ref={TitleRef}
          label="Title"
          name="title"
          invalid={invalidInputs["Title"]}
          onChange={handleChange}
        />
        <Input
          ref={DescriptionRef}
          label="Description"
          name="description"
          type="textarea"
          invalid={invalidInputs["Description"]}
          onChange={handleChange}
        />
        <Input
          ref={DeadLineRef}
          label="DeadLine"
          name="deadLine"
          type="date"
          invalid={invalidInputs["DeadLine"]}
          onChange={handleChange}
        />
      </div>
      <menu className="flex items-center justify-end gap-5 mt-4">
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Save
        </Button>
      </menu>
    </div>
  );
}
