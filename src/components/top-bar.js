import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Topbar = () => {
    return (
        <div id="topbar">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        <Link className="bar-main-link" to={"/"}>
                            Main Page
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar;