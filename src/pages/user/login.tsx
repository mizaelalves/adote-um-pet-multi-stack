import { GetServerSideProps, NextPage } from "next";
import { Button, Grid, TextField, Paper } from "@mui/material";
import Title from "../../components/Header/title";
import { useState, SyntheticEvent, useContext } from "react";
import { ApiServices } from "../../data/services/apiServices";
import { AxiosError } from "axios";
import { AuthContext } from "../../data/context/AuthContext";
import { parseCookies } from "nookies";


const LoginUser: NextPage = () => {
  //const { user } = useContext(AuthContext);
  const { "pet-token": token } = parseCookies();
  ApiServices.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const {signIn}  = useContext(AuthContext)
  //const {register, handleSubmit} = useForm()
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
    const data = {email, password}
  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    await signIn(data)

  };

  /*
  async function userLogin(){
    await ApiServices.post('/token/',{
      email,
      password
    }).then((response) =>{
      const access = response.data.access
      const refresh = response.data.refresh
      console.log("função userLogin")
      //console.log('esse é o access '+ access)
      //console.log('esse é o refresh '+ refresh)
    })
    .catch((error: AxiosError<any> ) =>{
      if(error !== null){
        console.log(error)
      }
    })
    }
  */
  return (
    <>
      <Title title={"Faça o seu login"} subtitle={""}></Title>

      <Paper sx={{ maxWidth: 400, mx: "auto", p: 5 }}>
        <form onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label={"E-mail"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Digite seu E-mail"}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={"Senha"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Digite sua senha"}
                fullWidth
              ></TextField>
              <Button
                variant="contained"
                type= "submit"
                fullWidth
                sx={{ marginTop: "20px", fontSize: "18px" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  const { ['pet-token']: token} = parseCookies(ctx)

  if(token){
    return {
      redirect: {
        destination: '/user/dashboard',
        permanent: false
      }
    }
  }

  return{
    props: {}
  }
}

export default LoginUser;