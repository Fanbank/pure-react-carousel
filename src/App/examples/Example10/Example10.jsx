import React from 'react';
import {
  ButtonBack, ButtonNext, CarouselProvider, ImageWithZoom, Slide, Slider,
} from '../../../';

import s from '../../style.css';

class Example10 extends React.Component {
  constructor(props) {
    super(props);
    this.addSlide = this.addSlide.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  state = {
    currentSlide: 1,
    totalSlides: 2,
  }

  getStore() {
    return this.ref.getStore();
  }

  setRef(ref) {
    this.ref = ref;
    this.subscribeToStore();
  }

  addSlide() {
    this.setState(state => ({ ...state, totalSlides: state.totalSlides + 1 }));
  }

  handleStoreChange() {
    const { currentSlide } = this.getStore().getStoreState();
    if (currentSlide !== this.state.currentSlide) {
      this.setState(state => ({ ...state, currentSlide }));
    }
  }

  subscribeToStore() {
    this.getStore().subscribe(this.handleStoreChange);
  }

  render() {
    const { currentSlide, totalSlides } = this.state;
    return (
      <CarouselProvider
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        naturalSlideWidth={400}
        naturalSlideHeight={500}
        ref={this.setRef}
      >
        <h1 className={s.headline}>Control Caorusel via Context</h1>
        <Slider className={s.slider}>
          {[...Array(totalSlides)].map((_, index) => (
            <Slide index={index} key={index}>
              <ImageWithZoom src={`./media/img0${index + 1}.jpeg`} />
            </Slide>
          ))}
        </Slider>
        <button onClick={this.addSlide}>Add</button>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    );
  }
}

export default Example10;
