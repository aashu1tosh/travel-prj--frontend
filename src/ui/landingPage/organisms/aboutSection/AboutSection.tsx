import { image } from '@constant/image';
import './AboutSection.css';

const About = () => {
    return (
        <section className='about'>
            <div className='about-left'>
                <img src={image?.lake} alt='' className='about-img' />
            </div>
            <div className='about-right'>
                <h3>About Travel Info</h3>
                <h2>Empowering Global Travel Success Together</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae rem, culpa veritatis fuga aspernatur, eos laborum
                    libero animi quisquam in non obcaecati? Sed fugit quam nisi
                    modi blanditiis, nulla voluptatibus, officia similique autem
                    tempora consequatur, inventore nemo aperiam!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae rem, culpa veritatis fuga aspernatur, eos laborum
                    libero animi quisquam in non obcaecati? Sed fugit quam nisi
                    modi blanditiis, nulla voluptatibus, officia similique autem
                    tempora consequatur, inventore nemo aperiam!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae rem, culpa veritatis fuga aspernatur, eos laborum
                    libero animi quisquam in non obcaecati? Sed fugit quam nisi
                    modi blanditiis, nulla voluptatibus, officia similique autem
                    tempora consequatur, inventore nemo aperiam!
                </p>
            </div>
        </section>
    );
};

export default About;
