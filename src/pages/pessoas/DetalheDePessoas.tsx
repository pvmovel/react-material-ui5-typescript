import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <LayoutBaseDePagina 
      titulo="Detalhe de Pessoa"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={ id !=='nova' }
          mostrarBotaoNovo={ id !=='nova' }

          aoClicarEmSalvar={ handleSave }
          aoClicarEmSalvarEFechar={ handleSave }
          aoClicarEmApagar={ handleDelete }
          aoClicarEmNovo={ () => { navigate('/pessoas/detalhe/nova'); } }
          aoClicarEmVoltar={ () => { navigate('/pessoas'); } }
        />

      }
    >
      <p>DetalheDePessoas {id}</p>
    </LayoutBaseDePagina>
  );
};