import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';


export const ListagemDePessoas: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    // TODO estudar qual a diferença do || para o ?? e como usar corretamente
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);
          
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
          
        });
    });
  }, [busca]);

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
      <TableContainer component={ Paper } variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>E-Mail</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={ index }>
                <TableCell>Ações</TableCell>
                <TableCell>{ row.nomeCompleto }</TableCell>
                <TableCell>{ row.email }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};