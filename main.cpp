#include <iostream>
int main(){
    int age;
    std::cout << "what is your age?";
    std::cin >> age;
    if(age >= 18){
        std::cout << "you are an adult";
    }else{
        std::cout << "you are not an adult"
    }
}