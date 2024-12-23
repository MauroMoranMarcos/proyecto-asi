import {FormattedMessage, useIntl} from "react-intl";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from '../selectors';
import * as actions from '../actions';

import {
    Alert,
    AlertTitle, alpha,
    Box, Button, ButtonGroup,
    Collapse,
    Container, Dialog, DialogActions, DialogContent, FormControl, FormHelperText,
    Grid,
    IconButton, InputBase, InputLabel, MenuItem,
    Paper, Select,
    TextField,
    Typography, useTheme
} from "@mui/material";
import {BackButton, Errors} from "../../common";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Items from "./Items";
import {styled} from "@mui/material/styles";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const CheckInventory = () => {

    const dispatch = useDispatch();
    const items = useSelector(selectors.getItems);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();
    const intl = useIntl();

    const [keywords, setKeywords] = useState('');

    useEffect(() => {

        dispatch(actions.checkInventory({page: 0}));

    }, []);

    if (!items) {
        return null;
    }

    const handleSearchItems = (event) => {
        event.preventDefault();

        dispatch(actions.checkInventory({
                keywords: keywords.trim(),
                page: 0,
            }
        ));
    }

    return (
        <Container component="main" maxWidth="lg" disableGutters={true}
                   sx={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       padding: 0,
                       minHeight: '65vh',
                   }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "column" },
                    justifyContent: "center",
                    gap: 0,
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '4px',
                    flexGrow: 1,
                }}>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <Paper elevation={24}
                       sx={{
                           minHeight: '65vh',
                           display: 'flex',
                           flexDirection: 'column',
                       }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            mb: 1,
                            borderBottom: `1px solid ${theme.palette.primary.main}`,
                        }}>
                        <BackButton />
                        <Typography variant="h2" sx={{ mt: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                            <FormattedMessage id="project.items.CheckInventory.title"></FormattedMessage>
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexGrow: 1,
                                mr: 25
                            }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder={intl.formatMessage({ id: "project.global.fields.searchBar" })}
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={keywords}
                                    onChange={(event) => setKeywords(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleSearchItems(event);
                                        }
                                    }}
                                />
                            </Search>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                    </Box>
                    {items.result.items.length === 0 ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "column" },
                                justifyContent: "center",
                                gap: 4,
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 1,
                                    mb: 1,
                                }}>
                                <Alert
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start',
                                        ml: 1,
                                        mr: 1,
                                        mb: 1,
                                        mt: 1
                                    }}
                                    variant="outlined" severity="warning">
                                    <FormattedMessage id="project.items.CheckInventory.noItems" />
                                </Alert>
                            </Box>
                        </Box>
                        :
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '97%',
                                ml: 1,
                                mr: 1,
                                mb: 1,
                            }}>
                            <Items items={items.result.items}/>
                            {(items.result.existMoreItems || items.criteria.page > 0) &&
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mt: 1,
                                        mb: 1,
                                    }}>
                                    <ButtonGroup color="primary" size="small" variant="contained" aria-label="Basic button group">
                                        <Button
                                            disabled={items.criteria.page < 1}
                                            onClick={() => dispatch(actions.previousCheckInventoryResultPage(items.criteria))}>
                                            <WestIcon />
                                        </Button>
                                        <Button
                                            disabled={!items.result.existMoreItems}
                                            onClick={() => dispatch(actions.nextCheckInventoryResultPage(items.criteria))}>
                                            <EastIcon />
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            }
                        </Box>
                    }
                </Paper>
            </Box>
        </Container>
    )


}

export default CheckInventory;