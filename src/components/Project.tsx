import { useState } from "react";
import Button from "./Button";
import { useLocalStorage } from "../Utils/LocalStorage";
import { handleValidate } from "../Utils/Validation";
import Input from "./Input";
import Tasks from "./Tasks";

export default function Project({ project, setProjectsState }: any) {
  const [isEditing, setIsEditing] = useState(false);
  let content;

  const onAddTask = (task: string) => {
    const { updateById, getAll } = useLocalStorage("projects", []);
    const newProject = {
      ...project,
      tasks: [...project.tasks, task],
    };
    updateById(project.id, newProject);
    setProjectsState((prevState: any) => ({
      ...prevState,
      projects: getAll(),
    }));
  };

  const onRemoveTask = (index: number) => {
    const { updateById, getAll } = useLocalStorage("projects", []);
    const newProject = {
      ...project,
      tasks: project.tasks.filter(
        (task: string) => task !== project.tasks[index]
      ),
    };
    updateById(project.id, newProject);
    setProjectsState((prevState: any) => ({
      ...prevState,
      projects: getAll(),
    }));
  };
  if (isEditing) {
    content = (
      <EditProject
        project={project}
        setIsEditing={setIsEditing}
        setProjectsState={setProjectsState}
      ></EditProject>
    );
  } else {
    content = (
      <ShowProject
        project={project}
        setIsEditing={setIsEditing}
        setProjectsState={setProjectsState}
      ></ShowProject>
    );
  }

  return (
    <div>
      <div className="flex justify-between">{content}</div>
      <hr className="w-auto my-10 border-gray-300" />

      <Tasks
        id={project.id}
        onRemoveTask={onRemoveTask}
        onAddTask={onAddTask}
      />
    </div>
  );
}

function EditProject({ project, setIsEditing, setProjectsState }: any) {
  const [editedProject, setEditedProject] = useState(project);
  const [invalidInputs, setInvalidInputs] = useState({
    title: false,
    description: false,
    deadLine: false,
  });
  const handleChange = (e: any) => {
    setEditedProject((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

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
  const handleSaveClick = () => {
    if (
      !handleValidate(editedProject.title) ||
      !handleValidate(editedProject.description) ||
      !handleValidate(editedProject.deadLine)
    ) {
      return;
    }
    const { updateById, getAll } = useLocalStorage("projects", []);
    updateById(project.id, editedProject);
    setIsEditing((prevState: any) => !prevState);
    setProjectsState((prevState: any) => ({
      ...prevState,
      projects: getAll(),
    }));
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };
  return (
    <>
      <div data-theme="">
        <div className="mb-10 mr-10">
          <Input
            name="title"
            defaultValue={project.title}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className={
              invalidInputs["title"]
                ? "w-[25rem] font-bold text-5xl mx-auto mb-5 bg-red-200"
                : "w-[25rem] font-bold text-5xl mx-auto mb-5"
            }
          />

          <Input
            name="deadLine"
            defaultValue={project.deadLine}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="date"
            className="w-[15rem] font-roboto text-2xl mx-auto"
          />
        </div>
        <Input
          name="description"
          type="textarea"
          defaultValue={project.description}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={
            invalidInputs["description"]
              ? "w-[20rem] font-roboto text-2xl mx-auto bg-red-200"
              : "w-[20rem] font-roboto text-2xl mx-auto"
          }
        />
      </div>
      <div className="flex gap-5">
        <Button className="btn btn-success" onClick={handleSaveClick}>
          Save
        </Button>
        <Button className="btn btn-warning" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </>
  );
}
function ShowProject({ project, setIsEditing, setProjectsState }: any) {
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    const { deleteById, getAll } = useLocalStorage("projects", []);
    deleteById(project.id);
    setProjectsState((prevState: any) => ({
      ...prevState,
      projects: getAll(),
      selectedProjectId: undefined,
    }));
  };
  return (
    <>
      <div>
        <div className="mb-12">
          <div className="font-bold text-5xl mx-auto mb-5 ">
            {project.title}
          </div>
          <div className="font-roboto text-2xl mx-auto">{project.deadLine}</div>
        </div>
        <div className="font-roboto text-2xl mx-auto">
          {project.description}
        </div>
      </div>
      <div className="flex gap-5">
        <Button className="btn btn-info" onClick={handleEditClick}>
          Edit
        </Button>
        <Button
          className="btn btn-error"
          onClick={() => {
            //open modal deleteModal
            const deleteModal = document.getElementById(
              "deleteModal"
            ) as HTMLDialogElement;
            deleteModal?.showModal();
          }}
        >
          Delete
        </Button>
        <dialog id="deleteModal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Caution!</h3>
            <p className="py-4 font-roboto">
              Are you sure you want to delete this project?
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn mx-2">Close</button>
                <button
                  className="btn btn-error mx-2"
                  onClick={handleDeleteClick}
                >
                  {" "}
                  Delete{" "}
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
