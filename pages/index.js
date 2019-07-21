import Layout from '../components/Layout'
import axios from 'axios'
import Link from 'next/link';
import Movie from '../components/Movie'

class Index extends React.Component {
    static async getInitialProps({ query }) {
        const page = query.page ? Number(query.page) : 1
        const response = await axios.get(`http://www.omdbapi.com/?apikey=c9ee8e1f&s=Spider-Man&page=${page}`)
        const movies = await response.data.Search

        return { movies, page }
    }

    render() {
        return (
            <Layout>
                <h1>Spider-Man's Movies</h1>
                <div className="movies">
                    {this.props.movies.map((movie) => <Movie key={movie.imdbID} {...movie} />)}
                    
                    <style>{`
                        .movies {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center;
                        }
                    `}</style>
                </div>
                {this.renderPagination()}
            </Layout>
        )
    }

    renderPagination() {
        const previous = this.props.page > 1 ?
            <Link href={`/?page=${this.props.page - 1}`}><a>Previous</a></Link> :
            null;

        return (
            <div className="control">
                {previous}
                <Link href={`/?page=${this.props.page + 1}`}><a>Next</a></Link>

                <style jsx>{`
                        .control {
                            text-align: center;
                        }
                        .control a {
                            padding: 0 10px;
                        }
                    `}</style>
            </div>
        )
    }
}

export default Index