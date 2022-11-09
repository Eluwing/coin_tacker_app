import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CommonErrorPage from "./error/CommonErrorPage";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps{
    toggleDark: () => void;
    isDark:boolean;
}

function Router({toggleDark,isDark}:IRouterProps){
    
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/:coinId">
                    <Coin isDark={isDark}/>
                </Route>
                <Route path="/">
                    <Coins toggleDark={toggleDark} />
                </Route>
                <Route path="*" component={CommonErrorPage} />
            </Switch>
        </BrowserRouter>
        
    );

}
export default Router;