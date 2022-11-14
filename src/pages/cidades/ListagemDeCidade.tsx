import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const ListagemDeCidade: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    // TODO estudar qual a diferença do || para o ?? e como usar corretamente
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <LayoutBaseDePagina 
      titulo="Listagem de Cidades"
      barraDeFerramentas={
        <FerramentasDaListagem 
          mostrarInputBusca
          textoBotaoNovo='Nova'
          textoDaBusca={searchParams.get('busca') ?? ''}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto}, { replace: true })}
        />
      }
    >
    </LayoutBaseDePagina>
  );
};