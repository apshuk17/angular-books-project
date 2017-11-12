export class Book {

    static fromJSON({$id, $key, $title, $description, $imageLinks, $publisher,
                     $authors, $categories, $webReaderLink, $publishedDate, $averageRating}){
        return new Book($id, $key, $title, $description, $imageLinks, $publisher, 
                        $authors,  $categories, $webReaderLink, $publishedDate, $averageRating);
    }

    constructor(
       public $id: string,
       public $key: string,
       public $title: string,
       public $description: string,
       public $imageLinks: {[key: string]: string},
       public $publisher: string,
       public $authors: string[],
       public $categories: string[],
       public $webReaderLink: string,
       public $publishedDate: string,
       public $averageRating: string
    ) {}
}
