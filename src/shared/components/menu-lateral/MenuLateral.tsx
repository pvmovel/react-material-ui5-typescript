import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';


interface IListItemLinkProps{
  label: string;
  icon: string;
  to: string
  onClick: (() => void) | undefined;
}
interface IMenuLateralProps {
  children: ReactNode
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ label, icon, to, onClick }) => {
  const navigate = useNavigate();

  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false});
  
  const handleClick = () => {
    navigate(to);
    // Se for undefined não executa
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  return (
    <>

      <Drawer open={ isDrawerOpen } variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar 
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFRUZGRgZGhoZGhoaGhgYGBgYHBgZGhgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQkJSs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABAEAABAwMBBQYEAwQKAgMAAAABAAIRAwQhMQUSQVFhBiJxgZGhEzKxwXLR8EJS4fEHFBUjJDOCkrLCYqJjc+L/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBAAUG/8QAJxEAAwACAgIBAwQDAAAAAAAAAAECAxEhMRJBMgQiURNhcZEzQrH/2gAMAwEAAhEDEQA/APMFsLFsBGLNFbaFkLbVxgVQGFHXKmZooKuq4Bdka3KwhaXBHJXbQuQ1SALjmSNWXLy1kgGTocYA1K2xup5CSuLlzXaNE6RLjoELfpBxP+zB27scJ494wcqZzd1vyjddmJk+ogwoqVg8mYMeBj1TK3sXxvAGYieXuiWKn6DeSUKrgSA4SJMRwHDVSBu6yZhx/lMJg+jUIgsgdBGuCeiBurdxMATHloimKlPaAq5bWmQCp3flYekGT/qn8kM84+UDkZyOnUeOUU+1c3LuKgfT5mUDlrsPyTI6T93gMiDgfcFcENPMeK7LDHL7qIyhNOt0tOD5hSNqg4OPLioQ+FsGcaLjiY0zE+4U1tcFp3XqKjVMbh0zHj4rTm5g68Oqw5rY5YjKDEjsbmDDlYaGiOWSZZ8TitohmuyibkoMaoqAXQYCibQZQlNGWwQoGlwMd7CiGStFylt2SUxBTOkG0zgLETTtcBYtDPNGhdwuJW4JSxppEUqc8FJsuydVeGgL0Ky7LtawSMrZl0a2pKCGwFC5qu99sZglIq+yuSZ+jWuAFciB64YEbeWbmahRMtn7m+GO3P3gCR5nglOWnoLjW0c7q0Fy56kpRknhnx6Lm9GSm2T29N1R4pM1OsY8STrhXRvZJjAwHOgOMk9eiP7IdnPhU2VHt79TJ/8AFp0b6e6f7TeN9o4D0Gf5KnDCXL7FZr9LoS1tjMa0Na0AfXxU39js3MMEnjxH8E7rsHdgT6R4zwU7oDDA+UTGsxmE91wTqWynXezxyOEtpbHa455zJx7q1137wdAjE6ZngB4oKszcZA446rdha0Uu82ZvPgBL7nZbWDOesK8uptY0yM8ziBjgq/tB4fjh9UFSn6Cm2ip1bfiQg6ttywrK6hPh1XLrJgGnmk1i2PnJoqThGCo3JrtCjBxlLCxTVPix81tE9KCwmcg6KR795s8jjoCoKIg+KnY6JERr5ygDI2kEwdf1CsOyq28yDqMKr1OBCa7IuO8OfHryK1PTF5J8paHFYoYIi4CGaco2yVdBdII2iEFRR9ILpAfZKmuyqG+QEvoslXTsps2SDCMakG0tlYGFiujLNsaLEPkN8D5VcU+2FY/EVfVn7H3AY+DxWBI9A7J9mGsG+Rk5TbbdUMEBHW9+1tMEaAKjbb2x8RxDc5TI7AydC6/2jJMIeyuZdlBXQI1QdO5hwVW9IQlssu2bNrmT0SXs/bvcHmm8tcw5jkdJGhGqdOr79OOiG7HDcuXNd8tRpEdRke0qfJOyjG9MGfs0VyWPYGVv2KjBDXn9x7NA7kQh+zWxXPu2UnjAO+7lusl3uYHmrzfWjZBGoIcDyIyidi2bRd1aoED4bY5d/vf9R6pcrfY3Ipl7Q9v3hjGxwgJPes3wC2fXX9YR1esHgjWEHTY9p5t4/wACrJWkedb8nwGWDgREmYg/xz+pXdR4a2TgxnliRPssazG83Xjy44PlKE2qCWxOvHSfXrKx8sJLSF9Kq1zpcYAOvATqVyK4IcRiY7okCJ0nU8DnkpbS3g44R6gri+tpcQBjxBH1PCOK0Eru0am9LWz+Z4kpZ8CPmyndzTa3uggmOpnTGiTXVN54IjkDVqrRiUBc15wNEU+1PFQmi1qChk6Fz6Rcl13axlPXv5BL7ymdSkWtodFCYPyFK8yZnQH2/moXjKIuWgNEdfoFMyhA1Y+63bVd1wKmbQLgMjPsp2lrPlEu/eOf9o4LtHe+B88y0EwMcTH1QbXNn5wfCT7whaVJzzLpJ6ptZ2PEjTKx3t6Ry+lSW2zu3GiY0mSgLUScK0WWzX7s7qZJDr7iPZ1uXOAAXqfZyx3GAkKrdmtmy6SOK9Co0w0ABdVeh8T7JVixYgHHyaxqY2jtxzT1H1QLApar4C1sWuWet2VTfpa6t+yW2Wx8klLeyu1DuAFP3bSABynpa5FuvRX+0NuG4Cqb6RlPts7RDnJQKgJTH9yBn7Q61ud1uVENr7j2vbq0z48x5iQld/dQIBS6kSdUqq9DZXs9goXIqMbUZJY9u83m06OHiCCPJGf15lKlvES54AjSGtwD6Ku9hnl9o5oMFlYgdA9jXD1O8nm2do0abg10ExAGp4aDwhHi1vbOytudLsEtttMniMzB6A/mrJb37HtB3hnjj0cqLe3tOcsLQeJaQM51jqidlPa12D3HYI1ieIVD1XRGk57Lgx26+eB15KG/dkcBJI6eaykAWADUExzIk65wcadVHfD5fAz49PIhCuw9nVs4bpccAHzI6IepSc/LjDcw1br1jDGCeZEadEr2ltFweQwyGiSR8pjXxGfNcjGwm5osa2QW4GYOnSeJ8EjuDv5aYknXSOBB48QkO09rvcYb8qVm4ru0d9gu8kjlDfJYK9ATBdJS+4ptCXfDrDM+60y6eDDs+Kx0Go/cKDxwCGumOLThPNlWzakFvmgtrM3AR1hLYyUU64bkrp4wOv6K3ccSu2Ybny9PzU1dlE9GqTTAPPClo05P6wo7UYTC3GYAlAHIysWAAY/NTXl1us3Bq7XoOqiZ3Wkk5HBBB286TqtmdcnZs3Hih92aYHVWgr02ztwRovLtjNIe0hesbDouc0HKxvkjnsa7CtwCcaJ+hbO23AiVo+VpG1ixYuCPlJhyo7p+F0xQ3K72DK4HfZ260Cst7VhhVO7ONl6sW2XENVE8yIrihDcPkkqIPgLQfJXVyyGrekb2Lbl8lS27UGTlHW6Tvka+EW/sRdljqzCCWup75iPmYe7g4gh7vZcjYDrl91Ue5wDC0bvFznuwIJMDdDnHjKh7GPcLukxon4jwwg6bhDi8nwaCfJXWpdfBqPY8EMe8uDz8rsu7rjGMuMcM9Fl+TlqewsXimnRSe0dChaW9AUqjzcOJNRu87cDDO6A1w3Zx7HmidhueCxrhDaoD2HRuc45a6K83Gy7Gu1hrbjiMtnMdJGCEF2pu7ZraNNkOeajN0tGG5zngIlKwZ7mlNJ/uFlxTSbQ32Y3AknyU206YBEaaemvgtbPZLRnyxMiY8lztN8Hw4cunVem+zz56ANoVGs74eSTEtM5aZkGOGOejgqbtqqGktkHqNPJO9qXEZw7UQdQIHeLeGozzCpe2a0E58Y08ENPSCmdsW3N1mBk+y5ZVP7z3fgb3ZxIk6wuNnW3xKgZzknr0Tvb+y7msKDGtaWU2lrQA1m6JyXab2gzqoazJV4ls4vt2LX3jm4cXDo9pafXRdfGa8frCvdLYzW25+NDoYASRO84AAmOC8+vLT4b+7O79D+6sxfUu21o28HitotHY15FTcP7Qx4hZ23twyDzJQ3Zav/eNzBHH7I3+kDLKZ5bw95VKYnXB55WkmF1Vw2OX8lqu3Q/rH81qv9h+vqkV2NnoKtafdb1k/r0R1FzW5JAjMnggBWDG5y6MD2knkgH1HOMk/ksQWxtbXJe97pMBp3R0kZ8VNQOUFso/NjhE+Y/JG0BlahOQt/Ze333tC9o2TbhrBC8h7IgtcDC9j2b8gS38gMSDVixYjHmLFzvDmsXHHyowYQtw5NH2jlqlsouKOYpgO5RP2Tpy6eqs222Dc8lBsTZ3wxJC52xUJMBUTOlomp7rZWm08qS6Z3VKWQcqV5BbC3XAaZV3jKOtiubm2gru3CnaaY5vaLf/AEdNm/pk/sNqO8yxzf8AsVf9q2HxBjXME6CD01XmPYC5/wAazrvN8ix8e4C9VtLvenEfrh6JmF7TZ2aPBT+6KvcdmXkkl7QOmTxIB0UljsoMIbvEjeBcCAQYODkYI5q0VWSOWNeMpbd1AC0Dr15n7p8yTXbXQysToPPymZCA25cQXaeWBpAIhG7MJmdDuxidAMkqudoLjvGOfHIWvsCeivX13BO7ImZMnIP7Ph5Kr7QDjjzTe/qcMa+vVLqQDnZ5pdfgbPHJFsyjuuD2glzcjMDrPNWqh2mc2N5jCRz18NMpdZ0QDEa4HCM6zOvsmlS1a8Q4NgmfDh4xkpdYJrtJjVmpdMC2p2nrVRu7rGgcMkY0xhJi1zzL8+UegTs2DGkHd3s8zkDryQdy4N/JZOGY6WjnkquGdbEof3rd3mmH9I53GUW/i89ApeyNDfqTGAP5lBf0lP37llMfstHqSubCS4KO35xOgGfQn7od7iXfrxUxdAcf3sDwP8IUNIS5IYw6udY5Afn91EApbn5yowMLjhjs2d13l9cfdMtns3ngcygNnxuO5yPTKc7HZ32+K7fAu+z1Ps3spoa3HJX62pboVc7MubuN8FaUE8nSjTiBkqp9pe1PwQWsElF7evXMPRVS7tw/LtSnY8brl9HVfiI6nbW4krEd/ZTOS2n/AKMi/wBZiYWQcdFNSsNwzCb07YNyubh4OE7rom7A6zwGlV64neVjfbErj+zgRJCHxCTRTrmSYWU6XNOLqzAOihbQWzP5CqtdC2pRB4IZ9tAKfizQ19RDGE+X3PsFmZJQ3+EM+n+/Kp/LEWyLsUrtrhgMLCfAEbw/2kr1AXO6/eGnReMOqkVHO1yfQq/dnNo79Bm9kt7p8RgE+UKf6Z6bTKfq6Vytem/6L5Qvg5vWEEX71TPDj44hLqJjjhT1GOjeaYI0HDwhWddHmt77H9s/BxwVX2pkuKjf2hcxpaRuk6yJ9FWtqbcMfOI8NUp5ZT5KJxPRzfN4kpTZVJJ6adcrh9+5+BJ8oXVvSjKB0qfBvj4rkf0HjX+SPfetAkxnQfkkL6kAR6ZwhqlUnj4JnkClsa3u0hEBJ31XPOqic5T2ADnj9eqVVbGSj0XsVQ3Ke8cH9SvNu0t4atzXqA4aSGnzDB9ZVwdtgUrd+YJBDQOs/n7Lzqs7uTxe8n/S3/8ATv8A1S6ekMQM92AOhWWrQXZ0XDzqu7QZykhnNZ0ucVtokBcOMyeZXcYC04dbKplzM/vY9E62ayHhCdlaAe1w6hW3Zmx5eCdFj6FWuS79mqhhqujTICq2zrTcAhOv64GNyhngKeEBdpKYLeqqbcqXtVt45aOKSWN04tlW4fiT5X92xvurEpqX2SsT9AbOLnaQLoBXdq3eyVWtlS4y5W6zZhDPWzckpPSJ201zVbhSnCHuakBaKEt+0Sh6bQodqXWdVBaXa2aW9DXjbnY6p0pSTtQQ1jW8z/P2n1TFt6AkPaG6D3NHBjXO8SQQB67qV9R8dfwM+mbm9r8Mpj9SeZJ91e+xdtNvUP7QqNx03RnxlUivT3Yn90H1Vs7LbQ+FRrPPyipTB8HOa13tlefVuGmvyl/bLVCpOX+G/wCi6WbN4hp4ps+njoltF4Dg7hH2SvaO33SWim/cGpDHmT4gaL03euTzJxunpBG2dnMqMI464iQqnW2JHeMk9VPc9o2HutaQeoIPocoU7TYR3p90irmntlSxUlpMh/q4aut1RPuxwMj3Wm3IPFcqXoCpa7O3Ieo9SufyQlTK5s6URPfKNs6gYJPFBARlY96AMl2jdF+PIBL7t4LgBo1oaPqT6laq1czyUAOP1zQ0wpRw4YRNnAzx4eWUPW1A6Imk2Gk8Y9tPulhoF4KQ6BR8lKYwtOLj2Sd3CSNFf9iVwYnVUnsRTBbnTd/7fwV52Ra6mELArstttVBgBS7RZ3cJbYFwMlH3tSWnwQrs1cnn+1rfeeZ5rdPdYxS7WeQSeaQbQvyAvSxqfHZJe3WgO6vBvu8ViV/EJWIvI7xG9J4ZCsWz78EKk1bg78FN7KY1S/LjY+sT8tFpfdjgk97dkkhS2I3tSlW3a4Y7HBd5G4sKdPYv2mx2uqFsnldC93xCLsLTErXpvaGW1MgVzdFqFu2khzjzawdScu8hAUl/Sl4aOJhQXj+6DP7zvUwPoEjPbbSAxStNii+eC8xkSB6CExt6n+Brj96qz8/skzz3kxYf8G//AO5n/BylyLev5X/SmHpv+H/wvnZy/wDi27HTLhDH894YnzEHzVgq7TYxrZgQAM8QvL+x21fhVtxx7lSGnkHfsn3j05L0G/2cHtjOVfD8pILXjWzm7uqFT5mMM44eaU3mzLQDFNk+AUbuyJjeDyPA8o/NK7nZVVuGvcfdBUP8DZyIEurGjJ3Wx4IRtqwHBPqYWPpPGpJWCUGv2Ndb6Ow6FC56x6hc9a2CkdOQ1erwC5q1lCgbCSNO0UjWjChciJgT090NBoFc6TKMiKZ549J/kg2jKcWzgGuyBDSM8cZQN6ClbehUOC7OqjHBSt+ZEYXjsuXBpI03R5GT+XuvSOzzt4QSvNdiOLGu6ho9lddgVXNILpAQsCnqj0a1sm7qA2vT3Gk9E22fWDmAhQbWob4A6oV1sJHne0tnVHiQMKqbUoFuHAgr21tm0N0XmHbgtbUAEaFVYbdcCskqfuKTvhbXLiFieKOKY33SnFG4a1qGfb7jcJU97ilPhaLIyd0y02F6OCTbbeXPPJC2tYsK3dV95c1wJm35MgsoBhWe2qtDVUWPgosXRRy0gcj3wE3DC+oA2JOATgAuO7JPDVKO0Vdu+WtaAASBBkQMDPHSfNNdnv7xe4Ahu8Yd+1usdiOOXNPkqxtB4c8kD+PVS5Xux+NeOMiZl3qfQFFU3/4Z4/8Alpn/ANaiGt9Xfhd9I+6ItmBzC0mN6o3OujXfmgaDl8v9xeF6x2S20K1Bu8ZeyGv5mPld5j7ryy4phpgGURs7aD6L95h6EcHDkU7Ffi9+hOSNrR7JUvGQRp9ykW0q7Y7pzlV999Vje3XQROJd6xol9xtMmZKqq0hEoJrkIN70P/WSdJPhlRv3j0SHWxiWjdaqEG+oSpnUua5+GlvbC4IAFvdU4pqOou0bshOo8V3Xdgev69FG35gurnVA+wl0cUmyQnDN34Tu9EgwDxgHVKrdslG16jmsgDunB6EhC1sOHp7AOAUrI3sjCiGgRdsyXtjjC0Ev/Zy0Dg38W76aE+S9Js9mDcXnPZqrgEab5P0hekWu0gGZPBd4UwG1tjfZlTcwdFPeX7BqdFTNp7c3JIKpW1e0z3ndBKL9GkjJtHq17txjWEzwK8r21W+LUc8+A8FEy8e/UmFI9mFThxeK2JzZPJ6QmdSWI40VtN0L2aupdgKGlYYkpzStwVu6aAIQa5N83rRWbhkIGo0pndDKDcFtSFNaAt0qZjMLp4XJeh1oLeyYVdxj4gl4Azq0BxJjx3RPgFW6w+qfbQIFNu7qRvP8BAH1d/uSQiXY4DPjwUj+TZVv7UiS2b3XyPlafUj+Sm2cQCySRlzpAk4EKKm7ukHUtc4+wC4oVy17YMACCYmAcuMLGto2Wk02cXr5eTMqFjZIHMx6ru4cC4kaTjnCm2fG+AeMQeRBkeUiFs+jK5bL/a0S3wgDyW61uCNAURYXbHsnjxBwQYRbaPovS4aPM5T5K5WtOiAr28cFabmhGUivG5KRSGyxFVYoSjq7MqAU8hKaHJgjlA8I+pTiUFWWNBSyFgyD1XNwcjwUg1E6SP4lcVzJEckr2N9EtmIJPkFlzUJJE41hS2bMDqfRB8CVhxtuiMtW99p00Poc/QoNvy+aYU8Z/wDCPPT7rjkX/sswfDkc/sD903uapA1Vd7K1d1hHDukDliPsnNy7Cuw/BEmX5MVbRrzIVe+GS5WN1CUNTs+8jc7ewfJSiXZ9AwEyfTU1nRhFvoItCt75FP8AVFiaQsXaO2LGVgENeXGEP8TCXXNwg0GkcV3yUM4rHPUb3IWw0jpxUDl0uqLJe0cJz4DJ9gUNVpByjraxDWtHgyPwAF2PxO9lX3AEOdpyH1TfadYveYHyNz+J53ne5I8korEQ0cck+eVGipktI952JDWQg51KJonBE6tcT/tMIYj3WmGgmOwqe9XYOs+QBQLhEDzTzsfR3q/QNPqdPujxrdIDI9Sy37ZZFsWMoS6QWVGkNLSTmfWVH2f2mY3KkB3A8/yKf0qcDdOQfZLNobKY8SO6eDhwyOHkqFh/SbqPb20SrIqSmv7JtoV8HdaXRrugmPGNFUrm6yQcHqrHVvXNYGAkCJIBOvNVjasOBPLTmvNn66qvTWkUrApXZDUeNVGKk4aJPRDU2uc2IzOs8PBEstyzLXEGPVWOqafiuf3B8ZXbOLii8Aktga+SVl0lMLm4e4QThBQOOiVPnr7g1474Mt6D6r2Mpt3nuMADVxPAT0RG2dlVaDv7xhZMgAlpI6GCY4qKwr7lam7eLd1zZLfmAmDHknXa928QQKuutRrm68RLQl1TVpeiiYlw37Qjo/L/AKSShToiw7uEDkUGUYpnVMd0o5x7gPSD6tQVDiiA7uDlofNcci1bHvMTESR6ZgeisfxZAVQpv/uw7q3HQS33wnthcggKzDS8dE2aX5bHlvbyFJTtMqaxcCAmlOiE/fBM02yC2tUR8AKWQAt00LYSQG62WI0kLFuztHmrtErudVtYhYcg4XLlixAw0bapLb5nfgf/AMSsWJeT4sOPkgLaf+ZW/H/1Sq41/wBIWLFKihm2/N/pP/EofksWIgTCrX2E+d3iPo5YsTsPzQrN8Geiv4eX0UB1/XNbWKtkc9FaraH8TvqUh2lp5rFi+bx/5X/J6n+pxbaKVyxYvcnokrsBroKtp5LFiCxkEVP52/iH1Csnauq4tbJJ01JP7qxYo7+cluL/AB0IKHyO80Jw81ixOJzulqfAqen/AJZ8fzWLFxw9f/lN8B9QjbTQLFidj+IrJ8i37I4KxM0WLFTPRO+yOou6CxYtYPs4fqtLFiw0/9k=" 
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink 
                  to={drawerOption.path} 
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))};
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        { children }
      </Box>

    </>
  );
};