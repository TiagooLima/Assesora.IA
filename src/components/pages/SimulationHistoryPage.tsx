
import { CalendarClock, Goal, PiggyBank, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { simulationRecord } from "@/data/simulation";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { parseCurrency } from "@/utils/currency";
import { calcTotalSavings } from "@/utils/simulation";
import { Button } from "../shared/Button";
import { PageHero } from "../shared/PageHero";

const formatCurrency = (value: string) =>
    parseCurrency(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

const formatDate = (value?: string) => {
    if (!value) return "Data não informada";

    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "Data não informada"
        : date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export function SimulationHistoryPage() {
    const { getSimulations, deleteSimulation } = useSimulationStorage();
    const [simulations, setSimulations] = useState<simulationRecord[]>(getSimulations);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        if (!window.confirm("Deseja excluir esta simulação?")) return;

        deleteSimulation(id);
        setSimulations((current) => current.filter((simulation) => simulation.id !== id));
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <PageHero
                title="Histórico de simulações"
                subtitle="Acompanhe seus planos financeiros e retome uma simulação quando quiser."
            />

            {simulations.length === 0 ? (
                <section className="rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)]">
                    <Goal className="mx-auto mb-4 text-primary" size={32} />
                    <h2 className="text-lg font-semibold">Seu histórico está vazio</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Crie sua primeira simulação para começar a organizar seus objetivos.
                    </p>
                    <Button className="mx-auto mt-6" variant="primary" onClick={() => void navigate("/")}>
                        Criar simulação
                    </Button>
                </section>
            ) : (
                <div className="flex flex-col gap-4">
                    {simulations.map((simulation) => (
                        <article
                            key={simulation.id}
                            className="grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] lg:grid-cols-[minmax(220px,1.3fr)_repeat(3,minmax(120px,1fr))_auto] lg:items-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Goal size={22} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="truncate font-semibold">{simulation.goalName}</h2>
                                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                        <CalendarClock size={14} /> {formatDate(simulation.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Custo da meta</p>
                                <p className="mt-1 font-semibold">{formatCurrency(simulation.goalAmount)}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Prazo</p>
                                <p className="mt-1 font-semibold">{simulation.goalDeadline} meses</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                    <PiggyBank size={14} /> Economia mensal
                                </p>
                                <p className="mt-1 font-semibold">{formatCurrency(String(calcTotalSavings(simulation)))}</p>
                            </div>

                            <div className="flex items-center gap-2 lg:justify-end">
                                <Button
                                    aria-label={`Excluir simulação ${simulation.goalName}`}
                                    title="Excluir simulação"
                                    variant="ghost"
                                    icon={Trash2}
                                    className="text-red-500"
                                    onClick={() => handleDelete(simulation.id)}
                                />
                                <Button variant="secondary" onClick={() => void navigate(`/resultado/${simulation.id}`)}>
                                    Ver detalhes
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}