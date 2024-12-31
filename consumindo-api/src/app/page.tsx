"use client";
import { faCheckCircle, faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  prioridade: string;
  data_limite: string;
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<string>("todos");

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await fetch("https://accesso-dev-mocks.wiremockapi.cloud/tarefas");
        const data = await response.json();
        console.log("Resposta da API:", data); // Log da resposta completa
        if (Array.isArray(data.tarefas)) {
          setTarefas(data.tarefas);
        } else {
          console.error("Resposta da API não é um array:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTarefas();
  }, []);

  const getPrioridadeClasse = (prioridade: string) => {
    switch (prioridade.toLowerCase()) {
      case "alta":
        return "text-red-500";
      case "media":
        return "text-yellow-500";
      case "baixa":
        return "text-green-500";
    }
  };

  const getPrioridadeIcone = (prioridade: string) => {
    switch (prioridade.toLowerCase()) {
      case "alta":
        return faExclamationCircle;
      case "media":
        return faExclamationTriangle;
      case "baixa":
        return faCheckCircle;
    }
  };

  // const getStatusClasse = (status: string) => {
  //   switch (status.toLowerCase()) {
  //     case "concluida":
  //       return "text-green-500";
  //     case "em andamento":
  //       return "text-yellow-500";
  //     case "pendente":
  //       return "text-red-500";
  //   }
  // };

  const getStatusClasse = (status: string) => {
    switch (status.toLowerCase()) {
      case "concluida":
        return "text-green-500 block";
      default:
        return "hidden";
    }
  };

  const getStatusIcone = (status: string) => {
    switch (status.toLowerCase()) {
      case "concluida":
        return faCheckCircle;
      case "media":
        return faExclamationTriangle;
      case "baixa":
        return faCheckCircle;
    }
  };

  const formatDataLimite = (dataLimite: string) => {
    const date = new Date(dataLimite);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div>Carregando...</div>;
  };

  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === "todos") return true;
    return tarefa.status.toLowerCase() === filtro;
  });

  return (
    <div className="container">
      <h2 className="mb-5 text-lg	font-bold uppercase">Todas as Tarefas</h2>
      <nav className="mb-5 rounded-lg bg-gray-100 border p-2">
        <ol className="flex text-center">
          <li className={`mr-2 p-2 border rounded-lg w-1/3 ${filtro === "todos" ? "bg-slate-500 text-white" : ""}`}>
            <a href="#" className="block font-bold" onClick={() => setFiltro("todos")}>Todos</a>
          </li>
          <li className={`mr-2 p-2 border rounded-lg w-1/3 ${filtro === "em andamento" ? "bg-slate-500 text-white" : ""}`}>
            <a href="#" className="block font-bold" onClick={() => setFiltro("em andamento")}>Em Andamento</a>
          </li>
          <li className={`mr-2 p-2 border rounded-lg w-1/3 ${filtro === "concluida" ? "bg-slate-500 text-white" : ""}`}>
            <a href="#" className="block font-bold" onClick={() => setFiltro("concluida")}>Concluído</a>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4">
        {tarefasFiltradas.map((tarefa) => (
          <div className="border mb-5 p-2" key={tarefa.id}>
            <div className="float-left">
              <div>
                <FontAwesomeIcon icon={getStatusIcone(tarefa.status) || faCheckCircle} className={`float-left mt-1 mr-1 ${getStatusClasse(tarefa.status)}`} />

                <h3 className="font-bold">{tarefa.titulo}</h3>
              </div>
              <p>{tarefa.descricao}</p>
            </div>

            <div className="mt-3 float-right">
              <div className="border border-slate-400 rounded-md p-1 text-xs float-left">
                <p>{formatDataLimite(tarefa.data_limite)}</p>
              </div>
              <div className="float-left">
                <FontAwesomeIcon icon={getPrioridadeIcone(tarefa.prioridade) || faCheckCircle} className={`mt-1 ml-2 ${getPrioridadeClasse(tarefa.prioridade)}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}