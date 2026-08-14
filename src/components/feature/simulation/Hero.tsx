import cofrinho from '@/assets/cofrinho.png'

export function SimulationHero(){
    return (
        <div className="mb-9 text-center">
            <div className="flex flex-col items-center sm:flex-row">
                <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">Vamos planejar seu futuro?</h1>
                <img
                    className='h-16 w-16 ml-1 mb-4'
                    src={cofrinho}
                    alt=""
                    />
            </div>
            <p className="text-muted-foreground text-sm">Responda algumas perguntas para ter assessorias financeiras personalizados.</p>
        </div>
    )
}