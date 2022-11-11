import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const ButtonStyle: ComponentStyleConfig ={
    // 1. We can update the base styles
    baseStyle: {
        fontWeight: "600",
        fontSize: "0.875rem",
        lineHeight: "0.688rem",
        letterSpacing:"0.06em",
        textTransform: "uppercase",
        borderRadius:"8px",

    },
    // 2. We can add a new button size or extend existing
    sizes: {
        sm: {
            width: "130px",
        },
        md: {
            width: "160px",
        },
        lg: {
            width: "220px",
        minHeight: "65px",

        }
    },
    // 3. We can add a new visual variant
    variants: {
      primary: {
            backgroundColor: "blue.100",
            color:"gray.900",
            fontSize: "0.875rem",
            height: "48px",
            _hover: {
                border: "1px solid", 
                borderColor: "blue.100",
                background: "rgb(255, 255, 255, 0.3)",
                color: "gray.100"
                    },
            _active: {
                background: "rgba(255,255,255, 0.2)",
                color: "gray.200"
            },
            _disabled: {
                background: "green.900",
                color: "subtle",
                cursor: "not-allowed"

            },
            
      },
      secondary: {
        backgroundColor: "inverse",
        border: "1px solid rgba(152, 178, 178, 1)",
        color:"fresh",
        fontSize: "0.875rem",
        height: "48px",
        _hover: {
            border: "1px solid rgba(152, 178, 178, 1)",
            background: "rgba(152, 178, 178, 0.3)",
            color: "subtle"
                },
        _active: {
            background: "rgba(152, 178, 178, 0.2)",
            color: "rgba(152, 178, 178, 0.8)"
        },
        _disabled: {
            background: "rgba(88, 112, 112, 0.75)",
            color: "subtle",
            cursor: "not-allowed"
        },
    },
    dropdown: {
        bg:"n6",
        borderRadius:"none",
        height:"48px",
        border:"1px solid #587070",
        fontFamily:"PP Telegraf Light",
        fontSize:"16px !important",
        textTransform:"capitalize",
        fontWeight:"300",
        color:"subtle",
        _hover: {
            borderColor: "zing"
        }
        
  },
    //   4. We can override existing variants
    //   solid: (props) => ({
    //     bg: props.colorMode === "dark" ? "red.300" : "red.500",
    //   }),
    },
  };