import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, TextInput, Button, HelperText, ActivityIndicator } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import ProfileIcon from '../../assets/profile.png';
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import Test from '../../assets/images/13741368_2011.i203.010..hobby cartoon set-06.jpg'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').width;
const parseImageURI = (data) => {
  if (data?.thumbnailImage) {
    const uri = data.thumbnailImage
    const image = { uri: uri }
    return image
  }
  if (data?.image) {
    const uri = data.image
    const image = { uri: uri }
    return image
  }
  return null
}


const OrderProduct = ({ navigation, route }) => {
  const _goBack = () => navigation.navigate('Staff-Order');
  const { id, fullname, orderId } = route.params;
  const [profileData, setProfileData] = useState('');
  const [allTemplates, setAllTemplates] = useState('');
  const [allMaterials, setAllMaterials] = useState('');
  const [allComponents, setAllComponents] = useState('');
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState()
  const [hasTyped, setHasTyped] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const hasErrors = () => {

    if (text.trim() === '') {
      return true;
    }
    return false;

  };
  const onNoteChange = note => {
    setNote(note)
    // // console.log("note", note)
  }
  useEffect(() => {
    const GET_PROFILE_URL = `https://e-tailorapi.azurewebsites.net/api/profile-body/staff/customer/${id}`
    const fetchCustomerProfile = async () => {
      setLoading(true);
      try {

        const staffInfo = await AsyncStorage.getItem('staff');
        const token = staffInfo ? JSON.parse(staffInfo).token : '';
        const response = await fetch(GET_PROFILE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // // console.log("profile", data)
          setProfileData(data)
          setLoading(false);
        } else {
          const errorText = await response.text();
          setLoading(false);
          console.error('Fetch error:', errorText);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    const GET_Product_Templates_URL = `https://e-tailorapi.azurewebsites.net/api/template-management/templates`
    const fetchProductTemplates = async () => {
      try {
        const response = await fetch(GET_Product_Templates_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',

          },
        });
        if (response.ok) {
          const templates = await response.json();
          setAllTemplates(templates)
          setLoading(false);
        } else {
          const errorText = await response.text();
          setLoading(false);
          console.error('Fetch error:', errorText);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    const GET_ALL_METERIALS_URL = `https://e-tailorapi.azurewebsites.net/api/material/fabric`
    const fetchMaterials = async () => {
      try {
        const response = await fetch(GET_ALL_METERIALS_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const material = await response.json();
          setAllMaterials(material)
          setLoading(false);
        } else {
          const errorText = await response.text();
          setLoading(false);
          console.error('Fetch error:', errorText);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomerProfile();
    fetchProductTemplates();
    fetchMaterials();

  }, [id]);

  const [text, setText] = useState('');
  const onChangeText = text => {
    setText(text);
    setHasTyped(true);
  };
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')


  const [isComponentTypeLoading, setIsComponentTypeLoading] = useState(false)
  const handleSelectTemplate = (item) => {
    setSelectedTemplate(item)
    const GET_COMPONENTS_URL = `https://e-tailorapi.azurewebsites.net/api/template/${item}/component-types`
    const fetchComponents = async () => {
      setIsComponentTypeLoading(true)
      try {
        const response = await fetch(GET_COMPONENTS_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const components = await response.json();
          setAllComponents(components)
          setIsComponentTypeLoading(false)
        } else {
          const errorText = await response.text();
          setIsComponentTypeLoading(false)
          console.error('Fetch error:', errorText);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsComponentTypeLoading(false)
      }

    }
    fetchComponents();
  }
  const handleSelectProfile = (item) => {
    setSelectedProfile(item)
  }

  const handleSelectMaterial = (item) => {
    setSelectedMaterial(item)
  }
  const [selectedComponent, setSelectedComponent] = useState([]);


  const handleSelectComponent = (childId, parentId) => {
    const parentIndex = selectedComponent.findIndex(component => component[parentId]);
    const newComponent = { [parentId]: childId };

    if (parentIndex === -1) {
      setSelectedComponent([...selectedComponent, newComponent]);
    } else {
      const updatedComponents = [...selectedComponent];
      updatedComponents[parentIndex][parentId] = childId;
      setSelectedComponent(updatedComponents);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState({
    orderId: '',
    materialId: '',
    profileId: '',
    productTemplateId: '',
    name: '',
    note: '',
    productsComponent: []
  })
  const handleAddProduct = async () => {

    const convertedArray = selectedComponent.map((obj, index) => ({
      id: Object.keys(obj)[0],
      componentId: obj[Object.keys(obj)[0]]
    }));

    const payload = ({
      orderId: orderId,
      materialId: selectedMaterial,
      profileId: selectedProfile,
      productTemplateId: selectedTemplate,
      name: text,
      note: note,
      productComponents: convertedArray
    })
    // // console.log("Payload:", JSON.stringify(payload))
    setLoadingAdd(true)
    const ADD_PRODUCT_URL = `https://e-tailorapi.azurewebsites.net/api/product/${orderId}`
    const staff = await AsyncStorage.getItem('staff');
    const token = staff ? JSON.parse(staff).token : '';
    const response = await fetch(ADD_PRODUCT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    }

    )
    // // console.log("response", response)
    if (response.ok) {
      const data = await response.text();
      // // console.log("data", data)
      setLoadingAdd(false)
      navigation.navigate('Staff-Order-Detail', { orderId: orderId, fullname: fullname, id: id });
    } else {
      setLoadingAdd(false)
      const errorText = await response.text();
      console.error('Fetch error:', errorText);
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar.Header style={{ height: 60 }} statusBarHeight={0}>
          <View style={styles.headerContent}>
            <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
            <Appbar.Content title="Chọn sản phẩm" style={styles.title} />
          </View>
        </Appbar.Header>
        <View style={styles.orderContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>Khách Hàng: {fullname}</Text>
          </View>

          {(profileData.length === 0 && allTemplates.length === 0 && allMaterials.length === 0) ? (

            <ActivityIndicator animating={true} style={{ marginTop: 50, paddingTop: 50 }} color="#9f78ff" size="large" />
          ) : (
            <>
              <View style={{ margin: 10, marginTop: 20 }}>
                <Text style={styles.text}>Tên sản phẩm</Text>
                <TextInput
                  placeholder="Nhập tên sản phẩm"
                  onChangeText={onChangeText}
                  style={{ marginTop: 10, height: 50, width: WIDTH * 0.85, color: '#000000', backgroundColor: '#ffffff' }}
                />
                {hasTyped && hasErrors() && (
                  <HelperText type="error" visible={hasErrors()} style={{ padding: 0, margin: 0 }}>
                    Vui lòng nhập tên sản phẩm
                  </HelperText>
                )}

              </View>
              <View style={{ marginHorizontal: 10, marginTop: 0 }}>
                <Text style={styles.text}>Chọn hồ sơ số đo</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={Array.isArray(profileData) ? profileData.map(item => ({ value: item.id, label: item.name })) : []}
                  valueField="value"
                  labelField="label"
                  placeholder="Chọn số đo"
                  name="profile"
                  value={selectedProfile}
                  onChange={(selectedItem) => handleSelectProfile(selectedItem.value)}
                />
              </View>
              <View style={{ margin: 10 }}>
                <Text style={styles.text}>Chọn loại vải</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={Array.isArray(allMaterials) ? allMaterials.map(item => ({ value: item.id, label: item.name, image: { uri: item.image } })) : []}
                  valueField="value"
                  labelField="label"
                  name="template"
                  imageField="image"
                  placeholder="Chọn loại vải"
                  value={selectedMaterial}
                  imageStyle={styles.imageStyle}
                  onChange={(item) => handleSelectMaterial(item.value)}
                />

              </View>

              <View style={{ margin: 10 }}>
                <Text style={styles.text}>Chọn bản mẫu</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={Array.isArray(allTemplates) ? allTemplates.map(item => ({ value: item.id, label: item.name, image: { uri: item.thumbnailImage } })) : []}
                  valueField="value"
                  labelField="label"
                  name="template"
                  imageField="image"
                  placeholder="Chọn sản phẩm"
                  value={selectedTemplate}
                  imageStyle={styles.imageStyle}
                  onChange={(item) => handleSelectTemplate(item.value)}
                />
              </View>
              {isComponentTypeLoading && allComponents.length === 0 ?
                (<ActivityIndicator animating={true} color="#9f78ff" size="large" />) :
                (
                  allComponents.length !== 0 && (
                    <View style={{ paddingLeft: 10, paddingTop: 10 }}>
                      <Text style={styles.text}>Chọn kiểu</Text>
                      {allComponents.map((item, index) => (
                        <View style={{ marginHorizontal: 10, marginTop: 10 }} key={item.id}>
                          <Text style={[styles.text, { fontWeight: 600 }]}>{item.name}</Text>
                          <Dropdown
                            key={item.id}
                            style={[styles.dropdown, { width: 340 }]}
                            data={item?.components.map(component => ({ value: component.id, label: component.name }))}
                            valueField="value"
                            labelField="label"
                            placeholder="Chọn số đo"
                            name="profile"
                            value={selectedComponent.find(component => component[item.id])?.[item.id]}
                            onChange={(selectedItem) => {
                              handleSelectComponent(selectedItem.value, item.id)
                            }}
                            selectedValue={selectedComponent.find(component => component[item.id])?.[item.id]}
                          />
                        </View>
                      ))}
                    </View>

                  )
                )
              }

              < View style={{ margin: 10 }}>
                <Text style={styles.text}>Ghi chú</Text>
                <TextInput
                  placeholder="Thêm ghi chú"
                  onChangeText={onNoteChange}
                  value={note}
                  style={{ marginTop: 10, color: '#000000', backgroundColor: '#ffffff', width: WIDTH * 0.85 }}
                  maxLength={40}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
              <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "flex-end", marginBottom: 90 }}>
                <Button mode="contained" style={{ marginTop: 7, backgroundColor: "#D9D9D9D9", alignItems: "center", fontSize: 12, width: 120, height: 40 }} onPress={_goBack}>
                  <Text style={{ color: "#000000" }}>Huỷ</Text>
                </Button>
                <Button mode="contained" style={{ marginTop: 7, marginLeft: 10, alignItems: "center", fontSize: 12, width: 120, height: 40 }} onPress={() => handleAddProduct()}>
                  {loadingAdd ? <ActivityIndicator animating={true} color="#fff" size="5" /> : "Thêm"}
                </Button>
              </View>

            </>
          )
          }

        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default OrderProduct

const styles = StyleSheet.create({
  orderContainer: {
    margin: 20
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  dropdownLabel: {
    fontSize: 16,
    overflow: 'hidden',
  },

  header: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: 350,
    borderWidth: 5,
    borderColor: '#9f78ff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
  },
  dropdown: {
    fontSize: 16,
    marginTop: 5,
    height: 50,
    width: WIDTH * 0.85,
    padding: 20,
    borderBottomColor: '#9f78ff',
    borderWidth: 0.5,
    borderColor: '#000000',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  cardImg: {
    width: 64,
    height: 64,
    resizeMode: "contain"
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
    paddingTop: 0,
  },
  cardContent: {
    width: 380,
    marginTop: 20,
    height: 170,
    textAlign: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#9f78ff',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#9f78ff',
  },
  cardParagraph: {
    fontSize: 14,
    width: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

  },

})