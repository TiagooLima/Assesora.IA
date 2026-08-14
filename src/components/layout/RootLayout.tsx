import { Outlet } from "react-router-dom";
import { Header } from "../shared/Header";
//Arquivo de layout de todas as rotas
export function RootLayout(){
    return(
        <>
            <Header />
            <Outlet /> {/* Parecido com children, mas é usado no router para dizer onde os conteudos da rota vao ser exibidos. No caso, depois do componente Header */}
        </>
    )
}