import { useIdentifier } from "~/lib/hooks";

function Pin({ id, ...props }) {
  const identifier = useIdentifier(id);
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 22 26"
      fill="none"
      id={identifier}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.436 15.348A11.234 11.234 0 010 10.5C.151 4.762 4.989.144 11 0c6.011.144 10.849 4.762 11 10.5a11.237 11.237 0 01-1.46 4.848l-.086.14a83.527 83.527 0 01-3.343 4.771C13.744 24.78 12.32 25.667 11 25.667c-.843 0-2.83 0-9.478-10.174l-.086-.146zM6.112 10.5C6.112 7.923 8.3 5.833 11 5.833c2.7 0 4.888 2.09 4.888 4.667s-2.188 4.666-4.888 4.666c-2.7 0-4.89-2.089-4.89-4.666z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Pin;
