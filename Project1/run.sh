#!/bin/bash

mkdir -p compiled images

# ############ Convert friendly and compile to openfst ############
for i in friendly/*.txt; do
	echo "Converting friendly: $i"
   python compact2fst.py  $i  > sources/$(basename $i ".formatoAmigo.txt").txt
done


# ############ convert words to openfst ############
for w in tests/*.str; do
	echo "Converting words: $w"
	./word2fst.py `cat $w` > tests/$(basename $w ".str").txt
done


# ############ Compile source transducers ############
for i in sources/*.txt tests/*.txt; do
	echo "Compiling: $i"
    fstcompile --isymbols=syms.txt --osymbols=syms.txt $i | fstarcsort > compiled/$(basename $i ".txt").fst
done

# ############ CORE OF THE PROJECT  ############
# ############ QUESTION 2
fstcompose compiled/step1.fst compiled/step2.fst compiled/metaphoneLN.fst
fstcompose compiled/metaphoneLN.fst compiled/step3.fst compiled/metaphoneLN.fst
fstcompose compiled/metaphoneLN.fst compiled/step4.fst compiled/metaphoneLN.fst
fstcompose compiled/metaphoneLN.fst compiled/step5.fst compiled/metaphoneLN.fst
fstcompose compiled/metaphoneLN.fst compiled/step6.fst compiled/metaphoneLN.fst
fstcompose compiled/metaphoneLN.fst compiled/step7.fst compiled/metaphoneLN.fst
fstcompose compiled/metaphoneLN.fst compiled/step8.fst compiled/metaphoneLN.fst
fstcompose compiled/metaphoneLN.fst compiled/step9.fst compiled/metaphoneLN.fst

# ############ QUESTION 4
fstinvert compiled/metaphoneLN.fst compiled/invertMetaphoneLN.fst






# ############ generate PDFs  ############
echo "Starting to generate PDFs"
for i in compiled/step*.fst compiled/t-93*.fst; do
	echo "Creating image: images/$(basename $i '.fst').pdf"
   fstdraw --portrait --isymbols=syms.txt --osymbols=syms.txt $i | dot -Tpdf > images/$(basename $i '.fst').pdf
done



# ############ tests  ############
# ############ QUESTION 3
echo "Testing metaphoneLN"

for w in compiled/t-93*.fst; do
    fstcompose $w compiled/metaphoneLN.fst | fstshortestpath | fstproject --project_type=output |
    fstrmepsilon | fsttopsort | fstprint --acceptor --isymbols=./syms.txt
done

