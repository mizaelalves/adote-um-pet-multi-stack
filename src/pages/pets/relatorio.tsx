import { NextPage } from "next";
import Title from "../../components/Header/title";
import { useRelatorio } from "../../data/hooks/PetsHooks/useRelatorio";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Relatorio: NextPage = () => {
  const { listaRelatorio } = useRelatorio();
  return (
    <>
      <Title
        title={"relatorio de Adoção"}
        subtitle={"Veja lista de pets adotados"}
      ></Title>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 830, mx: "auto", p: { xs: 3, md: 5 } }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pet</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell align={"right"}>Valor Mensal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaRelatorio.map((relatorio) => (
              <TableRow key={relatorio.id}>
                <TableCell>{relatorio.pet.nome}</TableCell>
                <TableCell>{relatorio.email}</TableCell>
                <TableCell align={"right"}>{relatorio.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Relatorio;
