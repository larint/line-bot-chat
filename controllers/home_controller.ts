import { Request, Response, } from 'express'

class HomeController {

    index = async (req: Request, res: Response) => {

        return res.render('homes/index')

    }

}

export { HomeController }