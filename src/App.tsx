import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import { useLocalStorage } from "./Utils/LocalStorage";
import NewProject from "./components/NewProject";
import Project from "./components/Project";
import NoProject from "./components/NoProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const { push, getId, getAll, getById } = useLocalStorage(
    "projects",
    projectsState.projects
  );

  useEffect(() => {
    setProjectsState({
      ...projectsState,
      projects: getAll(),
    });
  }, []);

  const onSubmit = (Title: string, Description: string, DeadLine: string) => {
    const newProject = {
      id: getId(),
      title: Title,
      description: Description,
      deadLine: DeadLine,
      tasks: [],
    };
    //check if the project is already exist
    if (getAll().some((project: any) => project.title.toString().toLowerCase() === Title.toString().toLowerCase())) {
      const dialog = document.getElementById(
        "ProjectAlreadyExist"
      ) as HTMLDialogElement;
      dialog.showModal();
      return;
    }
    push(newProject);
    setProjectsState((prevState: any) => {
      return {
        ...prevState,
        selectedProjectId: newProject.id,
        projects: getAll(),
      };
    });
  };

  const onCancel = () => {
    setProjectsState({
      ...projectsState,
      selectedProjectId: undefined,
    });
  };

  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onSubmit={onSubmit} onCancel={onCancel} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProject setProjectsState={setProjectsState} />;
  } else {
    content = (
      <Project
        project={getById(projectsState.selectedProjectId)}
        setProjectsState={setProjectsState}
      />
    );
  }

  return (
    <main className="flex gap-10 h-screen">
      <SideBar getAll={getAll} setProjectsState={setProjectsState} />
      <div className="w-[35rem] mt-20 ml-[10rem]">{content}</div>
      <dialog id="ProjectAlreadyExist" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-red-500 ">Error!</h3>
          <p className="py-4">Project Already Exist!</p>
        </div>
      </dialog>
    </main>
  );
}

export default App;
