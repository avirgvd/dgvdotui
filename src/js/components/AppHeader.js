import React from "react";

import {Anchor, Box, Button, Heading, Image, TextInput} from "grommet";

export const AppHeader = ({
                            appName,
                            appIcon,
                            onToggleSidebar,
                          }) => (
  <Box
    id="appbar"
    direction="row"
    background="background-contrast"
    align="center"
    justify="between"
    responsive={true}
  >
    <Button >
        <Box pad={{"left":"small", "vertical": "xsmall"}} direction="column" width="xsmall" >
          <Anchor href="/ui">
              {appIcon}
          </Anchor>
        </Box>
    </Button>

    <Box id="appbar-2" direction="row" align="center" gap="medium">
    </Box>
  </Box>
);
