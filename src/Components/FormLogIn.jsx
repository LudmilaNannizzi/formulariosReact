import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

const userSchema = object({
  email: string().email().required("El email es requerido"),
  password: string().required().min(8),
});

const FormLogIn = () => {
  const [hiddenPass, setHiddenPass] = useState(false);

  const handleOnClick = () => setHiddenPass(!hiddenPass);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = ({ email, password }) => console.log(email, password);

  return (
    <Box w="40%" mt="30px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} w="400px">
          <FormLabel htmlFor="email" name="email">
            Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            {...register("email", {
              required: "Ingrese un mail",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} w="400px">
          <FormLabel htmlFor="password" name="password">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              id="password"
              name="password"
              type={hiddenPass ? "text" : "password"}
              placeholder="password"
              {...register("password", {
                required: "Ingrese una contraseña",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener 8 caracteres mínimo ",
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleOnClick}>
                {hiddenPass ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
export default FormLogIn;
