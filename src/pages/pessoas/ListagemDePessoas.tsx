import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';


export const ListagemDePessoas: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    // TODO estudar qual a diferença do || para o ?? e como usar corretamente
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {

    PessoasService;
  }, []);

  return (
    <LayoutBaseDePagina 
      titulo="Listagem de Pessoas"
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