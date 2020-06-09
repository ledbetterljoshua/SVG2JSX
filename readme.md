# SVG2JSX

This is a pretty simple CLI to convert all svg files in your working directory into JSX components.

## Example

Original SVG file pin.svg

```
<svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.43611 15.3475C0.592188 13.8512 0.101989 12.1966 0 10.5C0.15112 4.76182 4.98858 0.144251 11 0C17.0114 0.144251 21.8489 4.76182 22 10.5C21.8905 12.1984 21.3919 13.8531 20.5394 15.3475L20.4539 15.4875C20.3928 15.5925 18.8772 17.9258 17.1111 20.2592C13.7439 24.78 12.32 25.6667 11 25.6667C10.1567 25.6667 8.17056 25.6667 1.52167 15.4933L1.43611 15.3475ZM6.11167 10.4999C6.11167 7.92254 8.3005 5.8332 11.0006 5.8332C13.7006 5.8332 15.8894 7.92254 15.8894 10.4999C15.8894 13.0772 13.7006 15.1665 11.0006 15.1665C8.3005 15.1665 6.11167 13.0772 6.11167 10.4999Z" fill="black"/>
</svg>
```

Converts to Pin.jsx

```
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

```

## Install

```
git clone {this}
cd SVG2JSX
npm i && npm i -g .
```

## Use it

After it is installed globaly, you can cd into any directory with svg files and run `svg2jsx`

## uninstall

`npm uninstall -g svg2jsx`

## options

`-d`

passing in the `-d` flag controls whether the original sgv files are deleted or not.

```
svg2jsx -d
```
