## ClojureScript in your Pocket
Speakers: Oswald Campesato ()

## Abstract
This presentation focuses on Deep Learning (DL) concepts, such as neural networks, backprop, activation functions, and Convolutional Neural Networks, with a short introduction to D3, and followed by a TypeScript-based code sample that replicates the Tensorflow playground. Basic knowledge of matrices is helpful for this session, which is intended for beginners.

Oswald is a former PhD Candidate (ABD) in Mathematics, an education junkie (6 degrees), and an author of 17 technical books (including Angular). He has worked for Oracle, AAA, and Just Systems of Japan, along with various startups. He has lived/worked in 5 countries on three continents, and in a previous career he worked in South America, Italy, and the French Riviera, and has traveled to 70 countries on six continents. He has worked from C/C++/Java developer to CTO, comfortable in 4 languages, and wants to become fluent in Japanese. Currently he is a consultant and provides training in Android, Deep Learning, and Angular.

## Intro to AI/ML/DL
AI started in Dartmouth in 1956, one of them invented Lisp

Hidden layers - intermediate computational layer
Neuron - a single data point in the hidden layer
Supervised Learning: If you know the answer to the question you are training your model to get, that is supervised learning.

AI: artificial intelligence - Rules -> Logic -> Ontology

These two instead use Data... lots of data.
ML: machine learning
* alan turing + learning machines
* data driven
...
DL: deep learning
* data driven
* 'perceptron' -> became neural nets
* large / massive data sets
* lots of heuristics (educated guesses)
* heavily based on empirical results
* Really pushed by the prevalence of cheap compute power
* "big bang" of deep learning in 2009 because of nvidia GPUs
* moving into hundreds and thousands of 'hidden layers'
* AlphaGo

Input layer -> several intermediate layers (hidden layers) -> output layer

All 3 have this in common:
* Use a model to represent system
* ex: Linear Regression

## Linear Regression
1) Start w/ simple model (2 vars)
2) generalize that model
3) Add more variables

Minimize Mean Squared Error
IE: 

## Activation Functions
Introduces non-linearity into the system, we start from this, if we didn't, the result would be predictable

3 popular ones:
1) sigmoid
2) tanh (hyperbolic tangent)
3) ReLU   <--- preferred

^ all these are supported in tensorflow, numpy (python) + other DL libs
others:
1) softmax

## Cost Functions
#### Gradiant Descent

## Back Propagation

## Hyper-parameters
* Higher level concepts about the model, ie: complexity / capacity to learn, largely heuristic
* ie: 
  * # of hidden layers 
  * the learning rate
  * the dropout rate -> effectively just ignore x% of the data
  * # of leaves in depth of tree

## CNNs vs. RNNs
* CNNs (Convolutional Neural Nets) -> Stateless
  * ~ 60% of all NNs
  * convolution: kind of like a map fn for matrices: used by PS for filters
vs.
* RNNs (Recurrent Neural Network), has some sort of memory, good for NLP & audio

## Generative Adversarial Networks (GANs)
* Can imperceptively change data such that it will consistently defeat all NNs
