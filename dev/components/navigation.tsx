import {Menu} from "lucide-react";

import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button} from "@/index"

export const Navigation = () => {
  // const location = useLocation();
  // const [open, setOpen] = useState<boolean>(false);
  //
  // const navigation = {
  //   ui: [
  //     {name: 'Accordion', path: '/accordion'},
  //     {name: 'Alert', path: '/alert'},
  //     {name: 'Alert Dialog', path: '/alert-dialog'},
  //     {name: 'Button', path: '/button'},
  //     {name: 'Badge', path: '/badge'},
  //     {name: 'Card', path: '/card'},
  //     {name: 'Dialog', path: '/dialog'},
  //     {name: 'Input', path: '/input'},
  //   ],
  //   layout: [
  //     {name: 'Container', path: '/container'},
  //     {name: 'Grid', path: '/grid'},
  //     {name: 'Flex', path: '/flex'},
  //   ],
  //   forms: [
  //     {name: 'Form', path: '/form'},
  //     {name: 'Select', path: '/select'},
  //     {name: 'Checkbox', path: '/checkbox'},
  //     {name: 'Radio', path: '/radio'},
  //   ]
  // };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="fixed right-2 bottom-2" asChild>
        <Button size="icon">
          <Menu/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
