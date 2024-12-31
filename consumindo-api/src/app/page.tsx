"use client";
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
      <h2 className="mb-5">Todas as Tarefas</h2>
      <nav className="mb-5 rounded-lg bg-gray-100 border p-2">
        <ol className="flex">
          <li className="mr-2">
            <a href="#" onClick={() => setFiltro("todos")}>Todos</a>
          </li>
          <li className="mr-2">
            <a href="#" onClick={() => setFiltro("em andamento")}>Em Andamento</a>
          </li>
          <li className="mr-2">
            <a href="#" onClick={() => setFiltro("concluida")}>Concluído</a>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4">
        {tarefasFiltradas.map((tarefa) => (
          <div className="border mb-5" key={tarefa.id}>
            <div className="float-left">
              <div>
                <p className={`float-left mr-1 ${getStatusClasse(tarefa.status)}`}>{tarefa.status}</p>
                <h3>{tarefa.titulo}</h3>
              </div>
              <p>{tarefa.descricao}</p>
            </div>

            <div className="float-right">
              <div className="border border-blue-400 rounded-lg float-left">
                <p>{formatDataLimite(tarefa.data_limite)}</p>
              </div>
              <div className="float-left">
                <p className={`${getPrioridadeClasse(tarefa.prioridade)}`}>{tarefa.prioridade}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}