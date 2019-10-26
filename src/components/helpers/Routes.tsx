import React from "react"
import { Route, Switch } from "react-router-dom"
import { NotFound } from "src/components/pages/NotFound"
import { Root } from "src/components/pages/Root"
import { TodoAppAsync } from "src/components/pages/TodoAppAsync"
import { TodoAppAsyncHooks } from "src/components/pages/TodoAppAsyncHooks"
import { TodoAppOldPlainState } from "src/components/pages/TodoAppOldPlainState"
import { TodoAppOldRedux } from "src/components/pages/TodoAppOldRedux"
import { TodoAppPlainState } from "src/components/pages/TodoAppPlainState"
import { TodoAppReDucks } from "src/components/pages/TodoAppReDucks"
import { RoutePath } from "src/constants/RoutePaths"

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
      <Route
        exact
        path={RoutePath.TodoAppAsyncHooks}
        component={TodoAppAsyncHooks}
      />

      {/* No route */}
      <Route component={NotFound} />
    </Switch>
  )
}
