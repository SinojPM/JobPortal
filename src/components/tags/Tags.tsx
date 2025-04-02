import { Text } from "@mantine/core"


const Tags = ({children}:{children:React.ReactNode}) => {
  return (
    <Text mt={"md"} c={"neutral.4"} bg={"brand.0"} bd={"solid 2px brand.5"} size="xs">
        {children}
    </Text>
  )
}

export default Tags