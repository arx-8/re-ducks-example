import { NotFound } from "components/pages/NotFound"
import { Root } from "components/pages/Root"
import { TodoAppAsync } from "components/pages/TodoAppAsync"
import { TodoAppOldPlainState } from "components/pages/TodoAppOldPlainState"
import { TodoAppOldRedux } from "components/pages/TodoAppOldRedux"
import { TodoAppPlainState } from "components/pages/TodoAppPlainState"
import { TodoAppReDucks } from "components/pages/TodoAppReDucks"
import { RoutePath } from "constants/RoutePaths"
import React from "react"
import { Route, Switch } from "react-router-dom"

type OwnProps = {
  children?: never
}

export const Routes: React.FC<OwnProps> = () => {
  return (
    <Switch>
      <Route exact path={RoutePath.Root} component={Root} />
      <Route
        exact
        path={RoutePath.TodoAppOldPlainState}
        component={TodoAppOldPlainState}
      />
      <Route
        exact
        path={RoutePath.TodoAppPlainState}
        component={TodoAppPlainState}
      />
      <Route
        exact
        path={RoutePath.TodoAppOldRedux}
        component={TodoAppOldRedux}
      />
      <Route exact path={RoutePath.TodoAppReDucks} component={TodoAppReDucks} />
      <Route exact path={RoutePath.TodoAppAsync} component={TodoAppAsync} />

      {/* No route */}
      <Route component={NotFound} />
    </Switch>
  )
}
