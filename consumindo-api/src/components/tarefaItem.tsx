import { faCheckCircle, faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  prioridade: string;
  data_limite: string;
}

const getPrioridadeClasse = (prioridade: string) => {
  switch (prioridade.toLowerCase()) {
    case "alta":
      return "text-red-500";
    case "media":
      return "text-yellow-500";
    case "baixa":
      return "text-green-500";
    default:
      return "text-gray-500";
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
    default:
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

export const TarefaItem = ({ tarefa }: { tarefa: Tarefa }) => (
  <div className="border mb-5 p-2 rounded-lg">
    <div className="float-left">
      <div>
        <h3 className="font-bold">{tarefa.titulo}</h3>
        <p>{tarefa.descricao}</p>
      </div>
    </div>
    <div className="mt-3 float-right">
      <div className="border border-slate-400 rounded-md p-1 text-xs float-left">
        <p>{formatDataLimite(tarefa.data_limite)}</p>
      </div>
      <div className="float-left flex items-center ml-2">
        <FontAwesomeIcon icon={getPrioridadeIcone(tarefa.prioridade)} className={`mr-1 ${getPrioridadeClasse(tarefa.prioridade)}`} />
        {/* <p className={`${getPrioridadeClasse(tarefa.prioridade)}`}>{tarefa.prioridade}</p> */}
      </div>
    </div>
  </div>
);