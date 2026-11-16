#include <stdio.h>
#include <stdlib.h>
#include <math.h>
int main(void){long N;if(scanf("%ld",&N)!=1)return 0;if(N<2){puts("0");return 0;}
long half=(N+1)/2;unsigned char*s=calloc(half,1);long lim=sqrt((double)N);
for(long i=1;2*i+1<=lim;i++)if(!s[i]){long p=2*i+1;for(long j=(p*p-1)/2;j<half;j+=p)s[j]=1;}
long c=1;for(long i=1;i<half;i++)if(!s[i])c++;printf("%ld\n",c);return 0;}
