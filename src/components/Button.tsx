export default function Button({ children, ...props }: any) {
  return (
    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" {...props}>
      {children}
    </button>
  );
}
