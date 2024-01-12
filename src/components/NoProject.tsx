import Button from "./Button";

export default function NoProject({ setProjectsState }: any) {
  return (
    <div className="flex mx-80 my-26">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold">Welcome!</h1>
        <h2 className="text-2xl font-light">
          Create a new project to get started
        </h2>
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
          Create Project
        </Button>
      </div>
    </div>
  );
}
