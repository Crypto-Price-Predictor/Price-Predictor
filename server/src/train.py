from data_preprocessing import load_data, preprocess_data, split_data
from model import create_model
import joblib # type: ignore
import numpy as np  # type: ignore
import pickle

layer_conf = [
    {"type":"input", "units": 2},
    {"type":"rnn", "hidden": 6, "output": 1}
]

def mse(actual, predicted):
    return np.mean((actual-predicted)**2)

def mse_grad(actual, predicted):
    return (predicted-actual)

def forward(x, layers):
    hiddens = []
    outputs = []
    for i in range(len(layers)):
        i_weight, h_weight, h_bias, o_weight, o_bias = layers[i]
        hidden = np.zeros((x.shape[0], i_weight.shape[1]))
        output = np.zeros((x.shape[0], o_weight.shape[1]))

        for j in range(x.shape[0]):
            input_x = x[j,:][np.newaxis,:] @ i_weight
            hidden_x = input_x + hidden[max(j-1, 0),:][np.newaxis,:] @ h_weight + h_bias

            hidden_x = np.tanh(hidden_x)
            hidden[j,:] = hidden_x

            output_x = hidden_x @ o_weight + o_bias
            output[j,:] = output_x

        hiddens.append(hidden)
        outputs.append(output)

    return hiddens, outputs[-1]

def backward(layers, x, lr, grad, hiddens):
    for i in range(len(layers)):
        i_weight, h_weight, h_bias, o_weight, o_bias = layers[i]
        hidden = hiddens[i]
        next_h_grad = None
        i_weight_grad, h_weight_grad, h_bias_grad, o_weight_grad, o_bias_grad = [0] * 5

        for j in range(x.shape[0] - 1, -1, -1):
            out_grad = grad[j,:][np.newaxis, :]

            o_weight_grad += hidden[j,:][:, np.newaxis] @ out_grad
            o_bias_grad += out_grad

            h_grad = out_grad @ o_weight.T

            if j<x.shape[0] - 1:
                hh_grad = next_h_grad @ h_weight.T
                h_grad += hh_grad

            tanh_deriv = 1 - hidden[j][np.newaxis,:] ** 2

            h_grad = np.multiply(h_grad, tanh_deriv)

            next_h_grad = h_grad.copy()

            if j>0:
                h_weight_grad += hidden[j-1][:, np.newaxis] @ h_grad
                h_bias_grad += h_grad

            i_weight_grad += x[j,:][:, np.newaxis] @ h_grad

        lr = lr / x.shape[0]
        i_weight -= i_weight_grad * lr
        h_weight -= h_weight_grad * lr
        h_bias -= h_bias_grad * lr
        o_weight -= o_weight_grad * lr
        o_bias -= o_bias_grad * lr
        layers[i] = [i_weight, h_weight, h_bias, o_weight, o_bias]

    return layers

def evaluate_model(X_test, y_test, layers):
    valid_loss = 0
    for j in range(X_test.shape[0]):
        seq_x = X_test[j]
        seq_y = y_test[j]
        _, outputs = forward(seq_x, layers)
        valid_loss += mse(seq_y, outputs)
        
    return valid_loss

def train_model(filepath):
    k = 5
    lr = 1.2e-1
    data = load_data(filepath)
    data = preprocess_data(data)
    X, Y = split_data(data)

    kf, layers = create_model(k, layer_conf)
    
    for train_index, test_index in kf.split(X):

        print(f"In Fold {k}: ")
        
        # Split the data
        X_train, X_test = X[train_index], X[test_index]
        y_train, y_test = Y[train_index], Y[test_index]

        epochs = 501 

        for epoch in range(epochs):
            epoch_loss = 0
            for j in range(X_train.shape[0]):
                seq_x = X_train[j]
                seq_y = y_train[j]
        
                hiddens, outputs = forward(seq_x, layers)
                grad = mse_grad(seq_y, outputs)
                layers = backward(layers, seq_x, lr, grad, hiddens)
                epoch_loss += mse(seq_y, outputs)
        

            if epoch % 100 == 0:
                valid_loss = evaluate_model(X_test, y_test, layers)
                print(f"Epoch: {epoch} train loss: {epoch_loss / len(X_train)} valid loss {valid_loss / len(X_test)}")


    # Save the trained model
    joblib.dump(layers, './models/model.pkl')

if __name__ == "__main__":
    train_model('./data/Binance_SHIBUSDT_d.csv')