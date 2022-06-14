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
  Flex,
  Select,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

const userSchema = object({
  email: string().email().required("El email es requerido"),
  password: string().required().min(8),
  age: number()
    .required("Debe ingresar su edad")
    .min(18, "Debe ser mayor de 18"),
});

const FormRegis = () => {
  const [hiddenPass, setHiddenPass] = useState(false);
  const [value, setValue] = useState("1");

  const handleOnClick = () => setHiddenPass(!hiddenPass);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = ({ email, password, age }) =>
    console.log(email, password, age);

  console.log(errors);
  return (
    <Box w="40%" mt="30px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} w="400px">
          <FormLabel htmlFor="email" name="email">
            Email
          </FormLabel>
          <Input
            id="emailReg"
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
              id="passwordReg"
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
        <Flex justifyContent="space-between" w="400px">
          <FormControl isInvalid={errors.age}>
            <FormLabel htmlFor="number" name="age">
              Edad
            </FormLabel>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="Ingrese su edad"
              {...register("age", {
                required: "Ingrese su edad",
                min: {
                  value: 18,
                  message: "debe ser mayor de 18",
                },
              })}
            />
            <FormErrorMessage>
              {errors.age && errors.age.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="select" name="estadoCivil">
              Estado civil
            </FormLabel>
            <Select placeholder="Estado civil">
              <option value="option1">Solter</option>
              <option value="option2">Casad</option>
            </Select>
          </FormControl>
        </Flex>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="1">Plata</Radio>
            <Radio value="2">Oro</Radio>
            <Radio value="3">Platinum</Radio>
          </Stack>
        </RadioGroup>

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
export default FormRegis;
