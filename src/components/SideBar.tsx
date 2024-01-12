import { useState, useEffect } from "react";
import Button from "./Button";

export default function SideBar({ getAll, setProjectsState }: any) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  const handleTheme = (e: any) => {
    if (e.target.checked) {
      setTheme("dracula");
    } else {
      setTheme("light");
    }
  };

  return (
    <aside className="bg-cyan-800 h-screen w-1/4 text-gray-400 flex-shrink-0 p-4 md:w-62 rounded-r-lg">
      <div className="ml-8">
        <div className="flex">
          <h2
            className=" my-10 font-bold uppercase md:text-xl text-stone-200 hover:text-stone-100 hover:cursor-pointer"
            onClick={() =>
              setProjectsState((prevState: any) => {
                return {
                  ...prevState,
                  selectedProjectId: undefined,
                };
              })
            }
          >
            Projects Manager
          </h2>
          <div className="mt-8 ml-auto mr-2">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={handleTheme}
                checked={theme === "dracula"}
              />

              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
        <Button
          onClick={() =>
            setProjectsState((prevState: any) => {
              return {
                ...prevState,
                selectedProjectId: null,
              };
            })
          }
        >
          Add Project
        </Button>
      </div>

      <div className="mt-10">
        {
          //load using getAll

          getAll().map((project: any) => {
            return (
              <p
                key={project.id}
                className="m-5 rounded-md cursor-pointer p-3 font-mono hover:text-lg hover:bg-slate-700 text-stone-200"
                onClick={() =>
                  setProjectsState((prevState: any) => {
                    return {
                      ...prevState,
                      selectedProjectId: project.id,
                    };
                  })
                }
              >
                <span key={project.id + 1}>{project.title}</span>
              </p>
            );
          })
        }
      </div>
    </aside>
  );
}
