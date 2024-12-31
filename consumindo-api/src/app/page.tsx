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

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h2 className="mb-5">Todas as Tarefas</h2>
      <nav className="mb-5 rounded-lg bg-gray-100 border p-2">
        <ol className="flex">
          <li className="mr-2"><a href="#">Todos</a></li>
          <li className="mr-2"><a href="#">Em Andamento</a></li>
          <li className="mr-2"><a href="#">Concluído</a></li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4">
        {tarefas.map((tarefa) => (
          <div className="border mb-5" key={tarefa.id}>
            <div className="float-left">
              <div>
                <p className="float-left mr-1">{tarefa.status}</p>
                <h3>{tarefa.titulo}</h3>
              </div>
              <p>{tarefa.descricao}</p>
            </div>

            <div className="border border-blue-400 rounded-lg float-right">
              <p className="float-left">{tarefa.data_limite}</p>
              <p className="float-left">{tarefa.prioridade}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}