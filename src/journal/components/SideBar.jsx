import { useSelector } from 'react-redux';
import { TurnedInNot, Person } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"


export const SideBar = ({ drawerWidth = 240 }) => {

    const {displayName} = useSelector(state => state.auth);

  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink:{ sm:0}}}
    >
        <Drawer
            variant="permanent"
            open
            sx={{
                display:{ xs:'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
            }}
        >

            <Toolbar>
                <Person  sx={{mr:1}}/>
                <Typography variant="h6" noWrap component="div">
                    { displayName }
                </Typography>
            </Toolbar>
                <Divider />

                <List>
                    {
                        ['uno','dos','tres','cuatro'].map( text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={text} />
                                        <ListItemText secondary={'Lorem ipsum dolor sit, amet consectetur '} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

        </Drawer>
    </Box>
  )
}
