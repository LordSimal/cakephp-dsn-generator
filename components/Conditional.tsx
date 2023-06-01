import {ReactNode} from "react";

const Conditional = ({
  showWhen,
  children
}: {
  showWhen: boolean,
  children: ReactNode
}) => {
  if (showWhen) return <>{children}</>
  return <></>
}

export default Conditional;