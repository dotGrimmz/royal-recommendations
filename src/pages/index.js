import { Questions } from "@/components/Questions";
import { useQuestions } from "@/hooks/useQuestions";
export default function Home() {
  const { questions } = useQuestions();
  return <Questions questions={questions} />;
}
