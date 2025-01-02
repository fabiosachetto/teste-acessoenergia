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

export const useTarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const response = await fetch("https://accesso-dev-mocks.wiremockapi.cloud/tarefas");
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Resposta da API:", data); // Log da resposta completa
        if (Array.isArray(data.tarefas)) {
          setTarefas(data.tarefas);
        } else {
          throw new Error("Resposta da API não é um array");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTarefas();
  }, []);

  return { tarefas, loading, error };
};